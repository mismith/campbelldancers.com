import { idKey, db } from '../helpers/firebase';

export default {
  firebase: {
    locationsRaw: db.child('locations'),
    classesRaw: db.child('classes'),
    timeslotsRaw: db.child('timeslots'),
  },
  computed: {
    locations() {
      return this.locationsRaw.map(($item) => {
        const item = {
          ...$item,
        };
        return item;
      });
    },
    classes() {
      return this.classesRaw.map(($item) => {
        const item = {
          '@timeslots': {},
          ...$item,
        };
        return item;
      });
    },
    timeslots() {
      return this.timeslotsRaw.map(($item) => {
        const item = {
          '@locations': {},
          '@classes': {},
          '@dancers': {},
          props: {
            active: false,
            disabled: false,
          },
          ...$item,
        };
        item.$classes = this.classes
          .filter(c => Object.keys(item['@classes']).includes(c[idKey]));
        item.$locations = this.locations
          .filter(l => Object.keys(item['@locations']).includes(l[idKey]));
        item.$capacity = item.$classes.reduce((capacity, c) => {
          const classCapacity = c.capacity || 0;
          if (capacity > 0 && classCapacity > 0) return Math.min(capacity, classCapacity);
          return Math.max(0, capacity, classCapacity);
        }, 0);
        item.$name = `<div>${item.$classes.map(c => c.name).join(' / ')}</div><small>${item.$locations.map(l => l.nickname).join(' / ')}</small>`;
        return item;
      });
    },
  },
};
