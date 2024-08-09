interface IArrayItem {
  name: string;
}

export const getGenresList = (array: IArrayItem[], countDelete?: number) => {
  if (countDelete ) {
  
    return array
      .splice(countDelete-1,array.length-countDelete)
      .map(i => i.name)
      .join(', ');
  }
  return array.map(i => i.name).join(', ');
};
