var filterControls = [
  new nyc.Check({
    target: '#type-filter',
    title: 'Location type',
    expanded: true,
    choices: [{
      name: 'type',
      value: 'permanent',
      label: '<img src="img/permanent.svg" alt="ID NYC (permanent)">ID NYC (permanent)',
      checked: true
    }, {
      name: 'type',
      value: 'temporary',
      label: '<img src="img/temporary.svg" alt="ID NYC (permanent)">ID NYC (temporary)',
      checked: true
    }, {
      name: 'type',
      value: 'cultural',
      label: '<img src="img/cultural.svg" alt="Cultural Institution">Cultural Institution',
      checked: true
    }, {
      name: 'type',
      value: 'financial',
      label: '<img src="img/financial.svg" alt="Financial Institution">Financial Institution',
      checked: true
    }]
  })
];
