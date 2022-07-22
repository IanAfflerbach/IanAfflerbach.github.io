import * as THREE from "three"
import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

let randomNumberInRange = (min, max) => Math.random() * (max - min) + min;

function ThreeBody(props) {
    let mesh = useRef();

    const initAlphaSpeed = randomNumberInRange(0.05, 0.075);
    const spawnAlphaDeg = randomNumberInRange(0.0, 360.0);
    let largeMeshAlpha = useRef();
    const initBetaSpeed = randomNumberInRange(0.05, 0.075);
    const spawnBetaDeg = randomNumberInRange(0.0, 360.0);
    let largeMeshBeta = useRef();
    const initGammaSpeed = randomNumberInRange(0.05, 0.075);
    const spawnGammaDeg = randomNumberInRange(0.0, 360.0);
    let largeMeshGamma = useRef();
    let largeMeshes = [
        { 
            mesh:largeMeshAlpha,
            vel: {
                x: initAlphaSpeed * Math.cos(spawnAlphaDeg),
                y: initAlphaSpeed * Math.sin(spawnAlphaDeg)
            },
            accel: {
                x:0,
                y:0
            },
        },
        {
            mesh:largeMeshBeta,
            vel: {
                x: initBetaSpeed * Math.cos(spawnBetaDeg),
                y: initBetaSpeed * Math.sin(spawnBetaDeg)
            },
            accel: {
                x:0,
                y:0
            },
        },
        {
            mesh:largeMeshGamma,
            vel: {
                x: initGammaSpeed * Math.cos(spawnGammaDeg),
                y: initGammaSpeed * Math.sin(spawnGammaDeg)
            },
            accel: {
                x:0,
                y:0
            },
        }
    ];

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < props.count; i++) {
            const pos = {
                x: randomNumberInRange(-25.0, 25.0),
                y: randomNumberInRange(-15.0, 15.0)
            };

            const initSpeed = randomNumberInRange(0.05, 0.075);
            const spawnDeg = randomNumberInRange(0.0, 360.0);
            const vel = {
                x: initSpeed * Math.cos(spawnDeg),
                y: initSpeed * Math.sin(spawnDeg)
            }

            const mass = randomNumberInRange(0.5, 1.5);
            const accel = {
                x: 0.0,
                y: 0.0
            }

            temp.push({ pos, vel, mass, accel });
        }

        return temp;
    }, [props.count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    const gravConst = 6.6743E-11;
    const largeBodyMass = 1.0E9;

    useFrame(() => {
        particles.forEach((particle, index) => {
            let { pos, vel, accel } = particle;
            dummy.position.set(pos.x, pos.y, 0);
            dummy.updateMatrix();

            //update position with velocity
            pos.x += vel.x;
            pos.y += vel.y;

            //update velocity with acceleration
            vel.x += accel.x;
            vel.y += accel.y;

            let newAccelX = 0.0;
            let newAccelY = 0.0;
            largeMeshes.forEach((body) => {
                const r = Math.sqrt(Math.pow(pos.x - body.mesh.current.position.x, 2) + Math.pow(pos.y - body.mesh.current.position.y, 2));
                const g = (gravConst * largeBodyMass) / Math.pow(r, 2);

                newAccelX += g * (body.mesh.current.position.x - pos.x);
                newAccelY += g * (body.mesh.current.position.y - pos.y);
            });

            accel.x = newAccelX;
            accel.y = newAccelY;

            mesh.current.setMatrixAt(index, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;

        largeMeshes.forEach((body, i) => {
            body.mesh.current.position.x += body.vel.x;
            body.mesh.current.position.y += body.vel.y;

            body.vel.x += body.accel.x;
            body.vel.y += body.accel.y;

            let newAccelX = 0.0;
            let newAccelY = 0.0;
            largeMeshes.forEach((other, j) => {
                if (i !== j)
                {
                    const r = Math.sqrt(Math.pow(body.mesh.current.position.x - other.mesh.current.position.x, 2) + Math.pow(body.mesh.current.position.y - other.mesh.current.position.y, 2));
                    const g = (gravConst * largeBodyMass) / Math.pow(r, 2);
    
                    newAccelX += g * (other.mesh.current.position.x - body.mesh.current.position.x);
                    newAccelY += g * (other.mesh.current.position.y - body.mesh.current.position.y);
                }
            });

            body.accel.x = newAccelX;
            body.accel.y = newAccelY;
        });
    });

    return (
        <>
            <instancedMesh ref={mesh} args={[null, null, props.count]}>
                <sphereBufferGeometry args={[0.1, 0]}/>
                <meshPhongMaterial color="#FFFFFF" />
            </instancedMesh>

            <mesh ref={largeMeshAlpha} position={[0, 10, 0]}>
                <sphereBufferGeometry args={[1.0, 0]}/>
                <meshBasicMaterial color="#FF0000"/>
            </mesh>

            <mesh ref={largeMeshBeta} position={[-20 / Math.sqrt(3), -10, 0]}>
                <sphereBufferGeometry args={[1.0, 0]}/>
                <meshBasicMaterial color="#00FF00"/>
            </mesh>

            <mesh ref={largeMeshGamma} position={[20 / Math.sqrt(3), -10, 0]}>
                <sphereBufferGeometry args={[1.0, 0]}/>
                <meshBasicMaterial color="#0000FF"/>
            </mesh>
        </>
    )
}

function ThreeBodyComponent(props) {
    let light = useRef();

    return (
        <div style={{ width: "95vw", height: "95vh" }}>
            <Canvas
                camera={{ position: [0, 0, 200] }}
                onCreated={state => state.gl.setClearColor("black")}
            >
                <ambientLight ref={light}/>
                <ThreeBody count={5000}/>
            </Canvas>
        </div>
    )
}

export default ThreeBodyComponent