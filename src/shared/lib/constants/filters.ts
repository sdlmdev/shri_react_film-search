const reverseMap = (genres: { [key: string]: string }): { [key: string]: string } => {
  const reversed: { [key: string]: string } = {};

  for (const [key, value] of Object.entries(genres)) {
    reversed[value] = value === 'Не выбран' ? '' : key;
  }

  return reversed;
};

export const GENRES = {
  '0': 'Не выбран',
  comedy: 'Комедия',
  drama: 'Драма',
  action: 'Боевик',
  thriller: 'Триллер',
  horror: 'Ужасы',
  family: 'Семейный',
  cartoon: 'Анимированный',
  fantasy: 'Фэнтези',
  romance: 'Романтика',
  adventure: 'Приключения',
  musical: 'Мьюзикл',
  war: 'Военный',
};

export const REVERSED_GENRES = reverseMap(GENRES);

export const YEARS = {
  '0': 'Не выбран',
  '2009': '2009',
  '2008': '2008',
  '2007': '2007',
  '2006': '2006',
  '1990-2005': '1990-2005',
  '1950-1989': '1950-1989',
};

export const REVERSED_YEARS = reverseMap(YEARS);

export const FILTER_OPTIONS = [
  {
    label: 'Жанр',
    options: GENRES,
    placeholder: 'Выберите жанр',
  },
  {
    label: 'Год выпуска',
    options: YEARS,
    placeholder: 'Выберите год',
  }
];
