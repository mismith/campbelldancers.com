import { idKey, db } from '@/helpers/firebase';
import { countryFilter } from '@/main';

export default {
  firebase: {
    locationsRaw: db.child('locations'),
    classesRaw: db.child('classes'),
    timeslotsRaw: db.child('timeslots'),
    seasonsRaw: db.child('seasons'),
  },
  computed: {
    locations() {
      return this.locationsRaw
        .map(($item) => {
          const item = {
            ...$item,
            props: {
              active: true,
              disabled: false,
              ...$item.props,
            },
          };

          return item;
        })
        .filter(countryFilter);
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
          '@classes': {},
          '@locations': {},
          '@dancers': {},
          ...$item,
          props: {
            active: false,
            disabled: false,
            ...$item.props,
          },
        };

        item.$classes = this.classesRaw
          .filter(c => Object.keys(item['@classes']).includes(c[idKey]));
        item.$locations = this.locationsRaw
          .filter(l => Object.keys(item['@locations']).includes(l[idKey]));
        item.$capacity = item.$classes.reduce((capacity, c) => {
          const classCapacity = c.capacity || 0;
          if (capacity > 0 && classCapacity > 0) return Math.min(capacity, classCapacity);
          return Math.max(0, capacity, classCapacity);
        }, 0);
        item.$name = `<div>${item.$classes.map(c => c.name).join(' / ')}</div><small>${item.$locations.map(l => l.nickname).join(' / ')}</small>`;

        item.props.newbies = item.$classes.some(c => c.newbies);

        return item;
      });
    },
    seasons() {
      return this.seasonsRaw
        .map(($item) => {
          const item = {
            '@timeslots': {},
            ...$item,
            props: {
              active: true,
              disabled: false,
              ...$item.props,
            },
          };

          item.$timeslots = this.timeslots
            .filter(t => Object.keys(item['@timeslots']).includes(t[idKey]));

          return item;
        })
        .filter(countryFilter);
    },
  },
};
