import { ReactNode } from "react";

export interface Artist {
  title: string;
  description: ReactNode;
}

export const artistInfo: Artist[] = [
  {
    title: "Isabel Law",
    description: (
      <>
        <p>
          Isabel Law (b. 1997, Hong Kong) is an artist & researcher based in
          London.
        </p>

        <p>
          Her work focuses on examining our psychological relationship with(in)
          nature in urban environments and spaces where people leave a heavy
          footprint.
        </p>

        <p>
          From this, her practice broadly explores our wide ecological networks.
          She often alternates between a mix of found, organic or digital media,
          questioning how we conceptualise and capture the complexity, depth and
          impermanence of our natural world. Through her installations, objects
          and experiences, she hopes to elicit empathy and curiosity in the
          Other – from our human, to more-than-human neighbours.
        </p>
      </>
    ),
  },
  {
    title: "Martin Karl Kufeita",
    description: (
      <>
        <p>Martin Martin, who are you?</p>
        <p>
          Martin Kufeita’s practice blends material experimentation with
          gestures of hospitality. Working across woodworking, video, and
          participatory forms, he creates tools, settings, and encounters that
          invite collective experience.
        </p>
        <p>zvdvd</p>,
      </>
    ),
  },
  {
    title: "Zeren Oruc",
    description: (
      <>
        <p>
          {" "}
          Zeren Oruc is an independent curator, researcher, and dialogical
          artist dedicated to exploring and addressing modern issues of ecology,
          society, and sustainability through decolonial narratives and
          anti-capitalist theories.{" "}
        </p>
        <p>
          Her practice revolves around decentralized and non-hierarchical
          approaches rooted in long-term collaborations, with the intention of
          establishing an environment that fosters open conversation and care.
        </p>
        <p>
          She is the co-founder and curator of former Montemero Art Residency in
          Almeria, Spain, which has permenately closed due to severe drought in
          the region.{" "}
        </p>
        ,
      </>
    ),
  },
];
