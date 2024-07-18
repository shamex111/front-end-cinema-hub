import { TypeIconName } from "@/components/ui/Icon";

export interface IGenre {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: TypeIconName;
}

export interface IEditGenreInput extends Omit<IGenre, 'id' > {}
