function isThereSomething(smth) {
  if (smth)
    return `Есть`;
  else
    return `Нет`;
}

function phoneParse(number) {
  if (number != null)
    return `<a href="tel:${number}" style="color: blue !important">${number}</a>`
  else
    return `Нет номера`
}

function webParse(web) {
  if (web != null)
    return `<a href="${web}" style="color: blue !important">${web}</a>`
  else
    return `Нет сайта`
}

function isFree(free) {
  switch (free) {
    case 0:
      return `Платный`;
    case 1:
      return `Бесплатный`;
    default:
      break;
  }
};

function nameParse(name, web) {
  if (web != null)
    return `<style> .name{text-decoration: none; font-size: 15pt;}</style>
            <a class="name" href="${web}" style="color: blue !important">${name}</a>`
  else
    return `<style> .name{text-decoration: none; font-size: 15pt;}</style>
            <a class="name">${name}</a>`
}

function Hours(hours) {
  let string = ``;
  for (let i = 0; i < hours.length; i++) {
    switch (hours[i]) {
      case 'm':
        string += `<i class="fas fa-coffee"></i>`;
        break;
      case 'a':
        string += `<i class="fas fa-sun"></i>`;
        break;
      case 'p':
        string += `<i class="fas fa-cloud-moon"></i>`;
        break;
      case 'n':
        string += `<i class="fas fa-moon"></i>`;
        break;
      default:
    }
    if (i != hours.length - 1) {
      string += `, `
    } else {
      string += ``
    }
  }
  return string;
};

function typeOf(type) {
  switch (type) {
    case 'ai':
      return `Искусственный крытый`;
    case 'ao':
      return `Искусственный открытый`;
    case 'n':
      return `Натуральный`;
    default:
      break;
  }
};
