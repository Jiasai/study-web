import './tab.css';

// setActiveItem(2)
// to(1)

// set(data)

import { getData, getDelayedData } from 'api/getData';

// https://www.imooc.com/api/mall-wepApp/destination/content/1

// [{url,text},{}]

import { URL, TAB_ITEM_CLASS, TAB_ACTIVE_ITEM_CLASS_NAME } from './config';

class Tab {
  constructor(el) {
    this.itemEls = el.querySelectorAll(TAB_ITEM_CLASS);
  }

  setActiveItem(index) {
    for (const itemEl of this.itemEls) {
      itemEl.classList.remove(TAB_ACTIVE_ITEM_CLASS_NAME);
    }

    this.itemEls[index].classList.add(TAB_ACTIVE_ITEM_CLASS_NAME);
  }

  to(index) {
    this.setActiveItem(index);

    return getData(`${URL}/${this.itemEls[index].dataset.id}`);
  }
}

export default Tab;
