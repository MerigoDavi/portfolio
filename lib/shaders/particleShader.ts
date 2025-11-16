// Particle Field Vertex Shader
export const particleVertexShader = `
  uniform float uTime;
  uniform float uSize;
  uniform vec2 uMouse;
  
  attribute float aScale;
  attribute vec3 aRandomness;
  
  varying vec3 vColor;
  
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Mouse repulsion effect
    vec3 mousePos = vec3(uMouse * 2.0 - 1.0, 0.0) * 5.0;
    vec3 toMouse = modelPosition.xyz - mousePos;
    float mouseDistance = length(toMouse);
    float mouseStrength = smoothstep(2.0, 0.0, mouseDistance);
    
    modelPosition.xyz += normalize(toMouse) * mouseStrength * 0.5;
    
    // Animated movement
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);
    float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
    
    modelPosition.x = cos(angle + angleOffset) * distanceToCenter;
    modelPosition.z = sin(angle + angleOffset) * distanceToCenter;
    modelPosition.y += sin(uTime * aRandomness.x + position.x * 5.0) * 0.1;
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
    
    // Size attenuation
    gl_PointSize = uSize * aScale * (1.0 / -viewPosition.z);
    
    // Color based on position
    vColor = vec3(
      0.5 + 0.5 * sin(position.x * 2.0 + uTime),
      0.5 + 0.5 * sin(position.y * 2.0 + uTime + 2.0),
      0.5 + 0.5 * sin(position.z * 2.0 + uTime + 4.0)
    );
  }
`;

// Particle Field Fragment Shader
export const particleFragmentShader = `
  varying vec3 vColor;
  
  void main() {
    // Circular particle shape
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    
    if (dist > 0.5) {
      discard;
    }
    
    // Soft edges
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    
    // Glow effect
    float glow = pow(1.0 - dist * 2.0, 3.0);
    
    vec3 finalColor = vColor + glow * 0.5;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;
