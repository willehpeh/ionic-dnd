export class Spell {
  name: string;
  school: string;
  level: number;
  casting: {
    unit: string,
    amount: number
  };
  range: {
    unit: string,
    amount: number
  };
  components: {
    verbal: boolean,
    somatic: boolean,
    material: boolean,
    materialType: string
  };
  duration: {
    unit: string,
    amount: number
  };
  description: string;
  higherLevelsDescription: string;

  constructor() {

  }
}
