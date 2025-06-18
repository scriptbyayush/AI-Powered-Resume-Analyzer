"use client";
import { ResponsiveRadar as NivoRadar } from '@nivo/radar';

export function ResponsiveRadar(props: any) {
  return (
    <div style={{ height: 250, width: "100%" }}>
      <NivoRadar
        {...props}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        borderWidth={2}
        borderColor={{ from: 'color' }}
        gridLevels={5}
        gridShape="circular"
        dotSize={8}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        colors={['#38bdf8', '#0ea5e9']}
        blendMode="multiply"
        motionConfig="wobbly"
        isInteractive={false}
      />
    </div>
  );
}
