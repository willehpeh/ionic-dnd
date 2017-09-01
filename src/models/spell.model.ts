export class Spell {
  name: string;
  school: string;
  level: number;
  ritual: boolean;
  casting: {
    unit: string,
    amount: number
  };
  range: {
    self: boolean,
    touch: boolean,
    distance: number
  };
  components: {
    verbal: boolean,
    somatic: boolean,
    material: boolean,
    materialType: string
  };
  duration: {
    instantaneous: boolean,
    concentration: boolean,
    unit: string,
    amount: number
  };
  description: string;
  higherLevelsDescription: string;
  availableTo: {
    bard: boolean;
    cleric: boolean;
    druid: boolean;
    paladin: boolean;
    ranger: boolean;
    sorcerer: boolean;
    warlock: boolean;
    wizard: boolean
  };

  constructor() {

  }
}
