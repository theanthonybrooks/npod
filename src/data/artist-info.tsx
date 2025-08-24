import { ReactNode } from "react";

export interface Artist {
  name: string;
  description: ReactNode;
  mobileDesc: ReactNode;
  link: string;
}

export const artistInfo: Artist[] = [
  {
    name: "Isabel Law",
    description: (
      <>
        <p>Isabel Law is an artist & researcher based in London.</p>

        <p>
          Her work focuses on examining our psychological relationship with(in)
          nature in urban environments and spaces where people leave a heavy
          footprint.
        </p>

        <p>
          Her practice broadly explores our wide ecological networks. She often
          alternates between a mix of found, organic or digital media,
          questioning how we conceptualise and capture the complexity and
          impermanence of our world. Through her installations, objects and
          experiences, she hopes to elicit empathy and curiosity in the Other -
          from our human, to more-than-human neighbours.
        </p>
      </>
    ),
    mobileDesc: (
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
      </>
    ),
    link: "https://isabelelaw.cargo.site",
  },
  {
    name: "Martin Karl Kufeita",
    description: (
      <>
        <p>Martin Karl Kufeita is a Berlin-based artist.</p>
        <p>
          Martin Karl Kufieta&apos;s artistic practice combines both individual
          and collective approaches. His interdisciplinary work explores various
          themes, with his Polish heritage playing a continuous and central
          role. By incorporating objects from the past and locally sourced
          materials, he creates emotional connections and shares personal
          stories.
        </p>
        <p>
          A core aspect of his work is the desire to bring people together.
          Through participatory objects such as seating arrangements, tableware,
          and temporary gathering spaces,he encourages interaction and dialogue.
        </p>
      </>
    ),
    mobileDesc: (
      <>
        <p>Martin Karl Kufeita is a Berlin-based artist.</p>
        <p>
          His artistic practice combines both individual and collective
          approaches. His interdisciplinary work explores various themes, with
          his Polish heritage playing a continuous and central role.
        </p>
      </>
    ),
    link: "https://www.instagram.com/swusone/",
  },
  {
    name: "Zeren Oruc",
    description: (
      <>
        <p>
          Zeren Oruc is an independent curator, researcher, and dialogical
          artist dedicated to exploring and addressing modern issues of ecology,
          society, and sustainability through decolonial narratives and
          anti-capitalist theories.
        </p>
        <p>
          Her practice revolves around decentralized and non-hierarchical
          approaches rooted in long-term collaborations, with the intention of
          establishing an environment that fosters open conversation and care.
        </p>
        <p>
          She is the co-founder and curator of former Montemero Art Residency in
          Almeria, Spain, which has permenately closed due to severe drought in
          the region.
        </p>
      </>
    ),
    mobileDesc: (
      <>
        <p>
          Zeren Oruc is an independent curator, researcher, and dialogical
          artist dedicated to exploring and addressing modern issues of ecology,
          society, and sustainability through decolonial narratives and
          anti-capitalist theories.
        </p>
      </>
    ),
    link: "https://www.zerenoruc.com/",
  },
];
