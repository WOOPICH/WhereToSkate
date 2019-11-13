function isThereSomething(smth) {
  if (smth)
    return `Есть`;
  else
    return `Нет`;
}

function phoneParse(number) {
  if (number != null)
    return `<a href="tel:${number}">${number}</a>`
  else
    return `Нет номера`
}

function webParse(web) {
  if (web != null)
    return `<a href="${web}">${web}</a>`
  else
    return `Нет сайта`
}

function isFree(free) {
  switch (free) {
    case 0: return `Нет`;
    case 1: return `Да`;
    default: break;
  }
};

function nameParse(name, web) {
  if (web != null)
    return `<style> .name{text-decoration: none; font-size: 15pt;}</style>
            <a class="name" href="${web}">${name}</a>`
  else
    return `<style> .name{text-decoration: none; font-size: 15pt;}</style>
            <b class="name">${name}</b>`
}

function Hours(hours) {
  let string = ``;
  for (let i = 0; i < hours.length; i++) {
    switch (hours[i]) {
      case 'm': string += `Утро`; break;
      case 'a': string += `День`; break;
      case 'p': string += `Вечер`; break;
      case 'n': string += `Ночь`; break;
      default:
    }
    if (i != hours.length - 1) {
      string += `, `
    }
    else {
      string += `.`
    }
  }
  return string;
};

function typeOf(type) {
  switch (type) {
    case 'ai': return `Искусственный крытый`;
    case 'ao': return `Искусственный открытый`;
    case 'n': return `Натуральный`;
    default: break;
  }
};
