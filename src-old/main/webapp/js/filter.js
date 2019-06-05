var filterControls = [
  new nyc.Check({
    target: '#type-filter',
    title: 'Location type',
    expanded: true,
    choices: [{
      name: 'type',
      value: 'permanent',
      label: '<div class="icon icon-permanent"></div>ID NYC (permanent)',
      checked: true
    }, {
      name: 'type',
      value: 'popup',
      label: '<div class="icon icon-popup"></div>ID NYC (popup)',
      checked: true
    }, {
      name: 'type',
      value: 'cultural',
      label: '<div class="icon icon-cultural"></div>Cultural Institution',
      checked: true
    }, {
      name: 'type',
      value: 'financial',
      label: '<div class="icon icon-financial"></div>Financial Institution',
      checked: true
    }]
  })
];
