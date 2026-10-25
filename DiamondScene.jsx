"use client";
import React, { useEffect, useRef } from 'react';
import brandMark from './brand-mark.svg?url';

export default function DiamondScene({ animate = true }) {
  const host = useRef(null), animated = useRef(animate);
  useEffect(() => { animated.current = animate; }, [animate]);
  useEffect(() => {
    let dispose = () => {}, alive = true;
    Promise.all([import('three'), import('three/addons/loaders/SVGLoader.js'), fetch(brandMark).then(r => { if(!r.ok) throw new Error('Brand asset unavailable'); return r.text(); })]).then(([THREE, { SVGLoader }, svg]) => {
      if (!alive || !host.current) return;
      const element = host.current;
      let renderer;
      try { renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true, powerPreference:'low-power' }); }
      catch { element.dataset.fallback = 'true'; return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.setClearColor(0, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.setAttribute('aria-hidden', 'true');
      element.appendChild(renderer.domElement);
      const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(38, 1, .1, 40);
      camera.position.set(0, 0, 5.5);
      const group = new THREE.Group(); scene.add(group);
      const resources = [];
      // Extrude the supplied dpi symbol, preserving its counters and diamond border.
      const parsed = new SVGLoader().parse(svg);
      for (const path of parsed.paths) {
        const isTeal = path.color.g > path.color.r + 0.15;
        const face = new THREE.MeshPhysicalMaterial({
          color: path.color,
          roughness: 0.12,
          metalness: 0.15,
          clearcoat: 1.0,
          clearcoatRoughness: 0.08,
          reflectivity: 0.9,
          side: THREE.DoubleSide
        });
        const edge = new THREE.MeshStandardMaterial({
          color: path.color.clone().multiplyScalar(0.85),
          roughness: 0.22,
          metalness: 0.35
        });
        resources.push(face, edge);
        for (const shape of SVGLoader.createShapes(path)) {
          const geometry = new THREE.ExtrudeGeometry(shape, { depth:32, bevelEnabled:true, bevelThickness:3.2, bevelSize:1.5, bevelSegments:3, curveSegments:16, steps:1 });
          geometry.translate(-384,-384,-16);
          geometry.scale(.0035,.0035,.0035);
          const mesh=new THREE.Mesh(geometry, [face,edge]); mesh.scale.y=-1;
          group.add(mesh); resources.push(geometry);
        }
      }
      group.rotation.set(.035,-.14,0);
      scene.add(new THREE.AmbientLight('#ffffff', 1.8));
      const key = new THREE.DirectionalLight('#ffffff', 2.8); key.position.set(4, 5, 6); scene.add(key);
      const rim = new THREE.DirectionalLight('#16aaa5', 2.2); rim.position.set(-5, -3, 3); scene.add(rim);
      const followLight = new THREE.PointLight('#e8fcf8', 3.5, 12); followLight.position.set(0, 0, 4); scene.add(followLight);
      const resize = () => { const w=element.clientWidth,h=element.clientHeight; if(!w||!h)return; renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();renderer.render(scene,camera); };
      const observer=new ResizeObserver(resize);observer.observe(element);resize();
      let visible=true,frame,last=0,time=0,pointerX=0,pointerY=0,dirty=true,wasAnimated=true;
      const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;dirty=true;});intersection.observe(element);
      const pointer=e=>{
        const b=element.getBoundingClientRect();
        pointerX=(e.clientX-b.left)/b.width-.5;
        pointerY=(e.clientY-b.top)/b.height-.5;
        followLight.position.x = pointerX * 6;
        followLight.position.y = -pointerY * 6;
        dirty = true;
      };
      const resetPointer=()=>{
        pointerX=0; pointerY=0;
        followLight.position.set(0, 0, 4);
        dirty = true;
      };
      element.addEventListener('pointermove',pointer);element.addEventListener('pointerleave',resetPointer);
      const tick=stamp=>{
        frame=requestAnimationFrame(tick);const delta=Math.min((stamp-last)/1000,.05);last=stamp;
        if(!visible||document.hidden)return;
        if(animated.current){
          time+=delta;
          group.rotation.y=-.14+Math.sin(time*.4)*.12+pointerX*.22;
          group.rotation.x=.035+Math.cos(time*.3)*.05-pointerY*.15;
          group.position.y=Math.sin(time*.7)*.05;
          dirty=true;
        }
        if(wasAnimated!==animated.current){dirty=true;wasAnimated=animated.current;}
        if(dirty){renderer.render(scene,camera);dirty=false;}
      };
      frame=requestAnimationFrame(tick);element.dataset.ready='true';
      dispose=()=>{cancelAnimationFrame(frame);observer.disconnect();intersection.disconnect();element.removeEventListener('pointermove',pointer);element.removeEventListener('pointerleave',resetPointer);resources.forEach(r=>r.dispose());renderer.dispose();renderer.domElement.remove();delete element.dataset.ready;};
    }).catch(()=>{if(host.current)host.current.dataset.fallback='true';});
    return()=>{alive=false;dispose();};
  },[]);
  return <div ref={host} className="diamond-scene" role="img" aria-label="Three-dimensional Diamond dpi logo in its original navy and teal colors"><img className="brand-mark-fallback" src={brandMark} alt="" aria-hidden="true"/></div>;
}
