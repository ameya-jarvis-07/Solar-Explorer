import { Injectable, signal } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import { PLANETS, Planet } from '../models/planet.model';

@Injectable({
  providedIn: 'root'
})
export class SolarSystemService {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private planets: THREE.Mesh[] = [];
  private sunLight!: THREE.PointLight;
  private stars!: THREE.Points;
  private controls!: OrbitControls;
  private isUserInteracting = false;
  private onPointerDownMouseX = 0;
  private onPointerDownMouseY = 0;
  private onPointerDownLon = 0;
  private onPointerDownLat = 0;
  private lon = 0;
  private lat = 0;
  private isDragging = false;
  private previousMousePosition = { x: 0, y: 0 };
  private moon!: THREE.Mesh;
  private moonOrbitAngle = 0;
  private mouseX = 0;
  private mouseY = 0;
  private shootingStars: THREE.Mesh[] = [];
  
  currentPlanetIndex = signal(0);
  
  initScene(canvas: HTMLCanvasElement): void {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    
    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 4;
    
    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    this.scene.add(ambientLight);
    
    // Add sun light
    this.sunLight = new THREE.PointLight(0xffffff, 5, 150);
    this.sunLight.position.set(-50, 0, 0);
    this.scene.add(this.sunLight);
    
    // Add hemisphere light for better illumination
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    this.scene.add(hemiLight);
    
    // Create starfield
    this.createStars();
    
    // Create planets (including Sun from PLANETS array)
    this.createPlanets();
    
    // Setup OrbitControls for mouse interaction
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.controls.rotateSpeed = 0.5;
    this.controls.minPolarAngle = Math.PI / 2.5;
    this.controls.maxPolarAngle = Math.PI / 1.5;
    this.controls.enabled = false; // Disable by default, enable only for current planet
    
    // Setup mouse drag interaction for planet rotation
    this.setupMouseDrag(canvas);
    
    // Setup mouse parallax effect for stars
    this.setupMouseParallax(canvas);
    
    // Create shooting stars periodically
    this.createShootingStarPeriodically();
    
    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize());
    
    // Start animation loop
    this.animate();
  }
  
  private createStars(): void {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.8
    });
    
    const starsVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 200;
      const z = (Math.random() - 0.5) * 200;
      starsVertices.push(x, y, z);
    }
    
    starsGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starsVertices, 3)
    );
    
    this.stars = new THREE.Points(starsGeometry, starsMaterial);
    this.scene.add(this.stars);
  }
  
  private createPlanets(): void {
    const textureLoader = new THREE.TextureLoader();
    
    PLANETS.forEach((planetData, index) => {
      const geometry = new THREE.SphereGeometry(planetData.size * 0.5, 128, 128);
      
      // Load texture from URL with proper settings
      const texture = textureLoader.load(
        planetData.textureUrl,
        (loadedTexture) => {
          // Texture loaded successfully - configure for proper sphere mapping
          loadedTexture.wrapS = THREE.RepeatWrapping;
          loadedTexture.wrapT = THREE.ClampToEdgeWrapping;
          loadedTexture.minFilter = THREE.LinearMipMapLinearFilter;
          loadedTexture.magFilter = THREE.LinearFilter;
          loadedTexture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
          loadedTexture.colorSpace = THREE.SRGBColorSpace;
        },
        undefined,
        (error) => {
          // Fallback to color if texture fails to load
          console.error(`Failed to load texture for ${planetData.name}:`, error);
        }
      );
      
      // Use MeshBasicMaterial for Sun so it emits light visually
      const material = planetData.name === 'SUN' 
        ? new THREE.MeshBasicMaterial({ map: texture })
        : new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.6,
            metalness: 0.2,
            emissive: new THREE.Color(planetData.color),
            emissiveIntensity: 0.05
          });
      
      const planet = new THREE.Mesh(geometry, material);
      
      // Position planets along the x-axis with spacing
      const spacing = 8;
      planet.position.x = index * spacing;
      planet.position.y = 0;
      planet.position.z = 0;
      
      this.planets.push(planet);
      this.scene.add(planet);
      
      // If this is Earth, create the Moon to orbit it
      if (planetData.name === 'EARTH') {
        const moonGeometry = new THREE.SphereGeometry(0.135, 64, 64);
        const moonTexture = textureLoader.load('/textures/planets/2k_moon.jpg', (loadedTexture) => {
          loadedTexture.wrapS = THREE.RepeatWrapping;
          loadedTexture.wrapT = THREE.ClampToEdgeWrapping;
          loadedTexture.minFilter = THREE.LinearMipMapLinearFilter;
          loadedTexture.magFilter = THREE.LinearFilter;
          loadedTexture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
          loadedTexture.colorSpace = THREE.SRGBColorSpace;
        });
        const moonMaterial = new THREE.MeshStandardMaterial({
          map: moonTexture,
          roughness: 0.9,
          metalness: 0.1
        });
        this.moon = new THREE.Mesh(moonGeometry, moonMaterial);
        
        // Position moon relative to Earth
        const moonDistance = 0.8;
        this.moon.position.set(planet.position.x + moonDistance, 0, 0);
        this.moon.userData = { earthIndex: index, orbitRadius: moonDistance };
        this.scene.add(this.moon);
        
        // Add moon orbit ring
        const orbitGeometry = new THREE.RingGeometry(moonDistance - 0.02, moonDistance + 0.02, 128);
        const orbitMaterial = new THREE.MeshBasicMaterial({
          color: 0xC0C0C0,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.15
        });
        const orbitRing = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbitRing.position.copy(planet.position);
        orbitRing.rotation.x = Math.PI / 2;
        this.scene.add(orbitRing);
      }
      
      // Add Saturn's rings
      if (planetData.name === 'SATURN') {
        const ringGeometry = new THREE.RingGeometry(
          planetData.size * 0.65,
          planetData.size * 1.2,
          128
        );
        
        // Load ring texture
        const ringTexture = textureLoader.load('/textures/planets/2k_saturn_ring_alpha.png', (loadedTexture) => {
          loadedTexture.wrapS = THREE.RepeatWrapping;
          loadedTexture.wrapT = THREE.ClampToEdgeWrapping;
          loadedTexture.rotation = Math.PI;
        });
        
        const ringMaterial = new THREE.MeshStandardMaterial({
          map: ringTexture,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.95,
          roughness: 0.8,
          metalness: 0.1
        });
        
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.copy(planet.position);
        ring.rotation.x = Math.PI / 2.3; // Slight tilt for realism
        this.scene.add(ring);
      }
      
      // Add orbit ring for some visual interest
      if (index > 0) {
        const ringGeometry = new THREE.RingGeometry(
          planetData.size * 0.6,
          planetData.size * 0.65,
          64
        );
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: planetData.color,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.2
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.copy(planet.position);
        ring.rotation.x = Math.PI / 2;
        this.scene.add(ring);
      }
    });
  }
  
  updateCameraPosition(scrollProgress: number): void {
    // Calculate which planet we're looking at
    const maxIndex = PLANETS.length - 1;
    const rawIndex = scrollProgress * maxIndex;
    const targetIndex = Math.min(Math.round(rawIndex), maxIndex);
    const previousIndex = this.currentPlanetIndex();
    this.currentPlanetIndex.set(targetIndex);
    
    // Update controls target when planet changes
    if (previousIndex !== targetIndex && this.controls) {
      const planet = this.planets[targetIndex];
      if (planet) {
        this.controls.target.copy(planet.position);
      }
    }
    
    // Smooth camera movement between planets
    const spacing = 8;
    // Add extra space beyond last planet for better framing
    const totalScrollRange = (maxIndex * spacing) + 8;
    const targetX = scrollProgress * totalScrollRange;
    
    // Smooth interpolation
    this.camera.position.x += (targetX - this.camera.position.x) * 0.1;
    this.camera.position.y += (0 - this.camera.position.y) * 0.1;
    this.camera.position.z = 4;
    
    // Make camera look at the current position
    this.camera.lookAt(this.camera.position.x, 0, 0);
    
    // Animate planets depth based on distance from camera and size
    this.planets.forEach((planet, index) => {
      const planetData = PLANETS[index];
      const distanceFromCamera = Math.abs(planet.position.x - this.camera.position.x);
      const normalizedDistance = Math.min(distanceFromCamera / 10, 1);
      
      // Larger planets come forward, smaller planets go back
      const sizeFactor = planetData.size / 3.5; // Normalize by Jupiter's size (now 3.5)
      const baseZ = 0;
      const depthOffset = (1 - normalizedDistance) * sizeFactor * 2.5;
      
      planet.position.z += (baseZ + depthOffset - planet.position.z) * 0.05;
    });
  }
  
  private animate = (): void => {
    requestAnimationFrame(this.animate);
    
    // Update controls
    if (this.controls) {
      this.controls.update();
    }
    
    // Rotate planets
    this.planets.forEach((planet, index) => {
      planet.rotation.y += 0.001 * (1 + index * 0.1);
    });
    
    // Animate Moon orbiting Earth
    if (this.moon) {
      const earthIndex = this.moon.userData['earthIndex'];
      const earth = this.planets[earthIndex];
      if (earth) {
        this.moonOrbitAngle += 0.01; // Orbit speed
        const orbitRadius = this.moon.userData['orbitRadius'];
        this.moon.position.x = earth.position.x + Math.cos(this.moonOrbitAngle) * orbitRadius;
        this.moon.position.z = earth.position.z + Math.sin(this.moonOrbitAngle) * orbitRadius;
        this.moon.position.y = earth.position.y;
        
        // Rotate moon on its axis
        this.moon.rotation.y += 0.001;
      }
    }
    
    // Apply parallax effect to stars based on mouse position
    if (this.stars) {
      this.stars.rotation.x = this.mouseY * 0.1;
      this.stars.rotation.y = this.mouseX * 0.1;
    }
    
    // Update shooting stars
    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const star = this.shootingStars[i];
      const direction = star.userData['direction'];
      const speed = star.userData['speed'];
      
      // Move shooting star
      star.position.x += direction.x * speed;
      star.position.y += direction.y * speed;
      star.position.z += direction.z * speed;
      
      // Update life and fade out
      star.userData['life'] += 0.016; // Approximately 60fps
      const lifeProgress = star.userData['life'] / star.userData['maxLife'];
      (star.material as THREE.MeshBasicMaterial).opacity = 1 - lifeProgress;
      
      // Remove if life expired
      if (star.userData['life'] >= star.userData['maxLife']) {
        this.scene.remove(star);
        this.shootingStars.splice(i, 1);
        star.geometry.dispose();
        (star.material as THREE.Material).dispose();
      }
    }
    
    this.renderer.render(this.scene, this.camera);
  };
  
  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private setupMouseParallax(canvas: HTMLCanvasElement): void {
    canvas.addEventListener('mousemove', (event) => {
      // Normalize mouse position to -1 to 1 range
      this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
  }

  private createShootingStarPeriodically(): void {
    setInterval(() => {
      this.createShootingStar();
    }, 15000); // Every 15 seconds
  }

  private createShootingStar(): void {
    // Random starting position
    const startX = (Math.random() - 0.5) * 200;
    const startY = (Math.random() - 0.5) * 100 + 50;
    const startZ = (Math.random() - 0.5) * 200;

    // Create shooting star geometry (small elongated shape)
    const geometry = new THREE.CylinderGeometry(0.02, 0.02, 2, 8);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1
    });
    const shootingStar = new THREE.Mesh(geometry, material);
    
    shootingStar.position.set(startX, startY, startZ);
    
    // Random direction for movement
    const direction = new THREE.Vector3(
      Math.random() - 0.5,
      -(Math.random() * 0.5 + 0.5), // Always move downward
      Math.random() - 0.5
    ).normalize();
    
    // Rotate to align with direction
    shootingStar.lookAt(shootingStar.position.clone().add(direction));
    shootingStar.rotateX(Math.PI / 2);
    
    shootingStar.userData = {
      direction,
      speed: 0.8,
      life: 0,
      maxLife: 3 // Seconds
    };
    
    this.shootingStars.push(shootingStar);
    this.scene.add(shootingStar);
  }

  private setupMouseDrag(canvas: HTMLCanvasElement): void {
    canvas.addEventListener('mousedown', (event) => {
      this.isDragging = true;
      this.previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
      this.controls.enabled = false; // Disable orbit controls during manual drag
    });

    canvas.addEventListener('mousemove', (event) => {
      if (!this.isDragging) return;

      const deltaMove = {
        x: event.clientX - this.previousMousePosition.x,
        y: event.clientY - this.previousMousePosition.y
      };

      const currentPlanet = this.planets[this.currentPlanetIndex()];
      if (currentPlanet) {
        // Rotate planet based on mouse movement
        const rotationSpeed = 0.005;
        currentPlanet.rotation.y += deltaMove.x * rotationSpeed;
        currentPlanet.rotation.x += deltaMove.y * rotationSpeed;
      }

      this.previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    });

    canvas.addEventListener('mouseup', () => {
      this.isDragging = false;
      this.controls.enabled = true; // Re-enable orbit controls
    });

    canvas.addEventListener('mouseleave', () => {
      this.isDragging = false;
      this.controls.enabled = true;
    });

    // Touch support for mobile
    canvas.addEventListener('touchstart', (event) => {
      if (event.touches.length === 1) {
        this.isDragging = true;
        this.previousMousePosition = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        };
        this.controls.enabled = false;
      }
    });

    canvas.addEventListener('touchmove', (event) => {
      if (!this.isDragging || event.touches.length !== 1) return;

      const deltaMove = {
        x: event.touches[0].clientX - this.previousMousePosition.x,
        y: event.touches[0].clientY - this.previousMousePosition.y
      };

      const currentPlanet = this.planets[this.currentPlanetIndex()];
      if (currentPlanet) {
        const rotationSpeed = 0.005;
        currentPlanet.rotation.y += deltaMove.x * rotationSpeed;
        currentPlanet.rotation.x += deltaMove.y * rotationSpeed;
      }

      this.previousMousePosition = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };

      event.preventDefault();
    });

    canvas.addEventListener('touchend', () => {
      this.isDragging = false;
      this.controls.enabled = true;
    });
  }
  
  dispose(): void {
    window.removeEventListener('resize', () => this.onWindowResize());
    if (this.controls) {
      this.controls.dispose();
    }
    this.renderer.dispose();
    this.scene.clear();
  }
}
