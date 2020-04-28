var msgs = {
  error1: function(values) {
    return 'The id value [ ' + values.id + ' ] must be unique.';
  }
};

export default {
  id: 'id-unique',
  description: 'The value of id attributes must be unique.',
  msgs: msgs,
  init: function(parser, reporter) {
    var self = this;
    var mapIdCount = {};
    parser.addListener('tagstart', function(event) {
      var attrs = event.attrs,
        attr,
        id,
        col = event.col + event.tagName.length + 1;
      for (var i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i];
        if (attr.name.toLowerCase() === 'id') {
          id = attr.value;
          if (id) {
            if (mapIdCount[id] === undefined) {
              mapIdCount[id] = 1;
            } else {
              mapIdCount[id]++;
            }
            if (mapIdCount[id] > 1) {
              reporter.error(
                msgs.error1({id: id}),
                event.line,
                col + attr.index,
                self,
                attr.raw
              );
            }
          }
          break;
        }
      }
    });
  }
};
