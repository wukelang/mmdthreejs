xof 0303txt 0032


template VertexDuplicationIndices { 
 <b8d65549-d7c9-4995-89cf-53a9a8b031e3>
 DWORD nIndices;
 DWORD nOriginalVertices;
 array DWORD indices[nIndices];
}
template XSkinMeshHeader {
 <3cf169ce-ff7c-44ab-93c0-f78f62d172e2>
 WORD nMaxSkinWeightsPerVertex;
 WORD nMaxSkinWeightsPerFace;
 WORD nBones;
}
template SkinWeights {
 <6f0d123b-bad2-4167-a0d0-80224f25fabb>
 STRING transformNodeName;
 DWORD nWeights;
 array DWORD vertexIndices[nWeights];
 array float weights[nWeights];
 Matrix4x4 matrixOffset;
}

Frame RootFrame {

  FrameTransformMatrix {
    1.000000,0.000000,0.000000,0.000000,
    0.000000,-0.000000,1.000000,0.000000,
    0.000000,1.000000,0.000000,0.000000,
    0.000000,0.000000,0.000000,1.000000;;
  }
Frame Plane_001 {

  FrameTransformMatrix {
    0.000000,0.000000,1.000000,0.000000,
    -1.000000,-0.000000,0.000000,0.000000,
    0.000000,-1.000000,0.000000,0.000000,
    0.000000,0.000000,0.000000,1.000000;;
  }
Mesh {
4;
0.0400; 0.0400; 0.000000;,
-0.0400; 0.0400; 0.000000;,
-0.0400; -0.0400; 0.000000;,
0.0400; -0.0400; 0.000000;,
1;
4; 0, 3, 2, 1;;
  MeshMaterialList {
    2;
    1;
    1;;
  Material Material {
    1.000000; 1.000000; 1.000000;0.0;;
    0.000000;
    0.000000; 0.000000; 0.000000;;
    0.0; 0.0; 0.0;;
  }  //End of Material
  Material Mat1 {
    1.0; 1.0; 1.0; 1.0;;
    1.0;
    1.0; 1.0; 1.0;;
	1.0; 1.0; 1.0;;
TextureFilename {"snow1.png";  }
  }  // End of Material
    }  //End of MeshMaterialList
  MeshNormals {
4;
0.000000; 0.000000; 0.000000;,
0.000000; 0.000000; 0.000000;,
0.000000; 0.000000; 0.000000;,
0.000000; 0.000000; 0.000000;;1;
4; 0, 3, 2, 1;;
}  //End of MeshNormals
MeshTextureCoords {
4;
0.015625; -0.984375;,
0.015625; -0.015625;,
0.984375; -0.015625;,
0.984375; -0.984375;,
}  //End of MeshTextureCoords
 }
}
}