// color.model.ts

export class Color {
  id: number;
  name: string;
  value: string;

  constructor(
    id: number = 0,
    name: string = '',
    value: string = ''
    ) {
    this.id = id;
    this.name = name;
    this.value = value;
  }
}
