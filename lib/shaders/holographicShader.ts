// Holographic Vertex Shader
export const holographicVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normal;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Holographic Fragment Shader
export const holographicFragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uFresnelIntensity;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  // RGB split effect
  vec3 rgbSplit(sampler2D tex, vec2 uv, float offset) {
    float r = texture2D(tex, uv + vec2(offset, 0.0)).r;
    float g = texture2D(tex, uv).g;
    float b = texture2D(tex, uv - vec2(offset, 0.0)).b;
    return vec3(r, g, b);
  }
  
  // Fresnel effect
  float fresnel(vec3 viewDir, vec3 normal, float power) {
    return pow(1.0 - abs(dot(viewDir, normal)), power);
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Animated scanlines
    float scanline = sin(uv.y * 100.0 + uTime * 2.0) * 0.5 + 0.5;
    scanline *= 0.1;
    
    // Rainbow gradient
    vec3 rainbow;
    rainbow.r = sin(uv.x * 3.14159 + uTime) * 0.5 + 0.5;
    rainbow.g = sin(uv.x * 3.14159 + uTime + 2.0) * 0.5 + 0.5;
    rainbow.b = sin(uv.x * 3.14159 + uTime + 4.0) * 0.5 + 0.5;
    
    // Fresnel rim lighting
    vec3 viewDir = normalize(vPosition);
    float fresnelEffect = fresnel(viewDir, vNormal, 3.0) * uFresnelIntensity;
    
    // Combine effects
    vec3 color = rainbow;
    color += scanline;
    color += fresnelEffect * vec3(0.5, 0.8, 1.0);
    
    // Holographic interference
    float interference = sin(uv.y * 50.0 + uTime * 5.0) * 0.05;
    color += interference;
    
    gl_FragColor = vec4(color, 0.8);
  }
`;
