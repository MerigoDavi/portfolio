// Fluid Distortion Vertex Shader
export const fluidVertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fluid Distortion Fragment Shader
export const fluidFragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uIntensity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  
  varying vec2 vUv;
  
  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Create fluid distortion
    float noise1 = snoise(uv * 3.0 + uTime * 0.15);
    float noise2 = snoise(uv * 2.0 - uTime * 0.1);
    float noise3 = snoise(uv * 4.0 + uTime * 0.2);
    
    // Mouse interaction
    vec2 mouseInfluence = uMouse - uv;
    float mouseDist = length(mouseInfluence);
    float mouseEffect = smoothstep(0.5, 0.0, mouseDist) * uIntensity;
    
    // Combine noises
    vec2 distortion = vec2(noise1, noise2) * 0.1;
    distortion += mouseInfluence * mouseEffect * 0.2;
    
    vec2 distortedUV = uv + distortion;
    
    // Create color gradient
    float pattern = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
    pattern += mouseEffect;
    
    vec3 color = mix(uColor1, uColor2, smoothstep(-1.0, 1.0, pattern));
    color = mix(color, uColor3, smoothstep(-0.5, 1.5, noise3));
    
    // Add glow effect
    float glow = smoothstep(0.0, 1.0, 1.0 - length(uv - vec2(0.5)));
    color += glow * 0.1;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;
