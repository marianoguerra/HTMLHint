var msgs = {
  warn1: 'An alt attribute must be present on <img> elements.',
  warn2: function(values) {
    return 'The alt attribute of ' + values.selector + ' must have a value.';
  }
};

export default {
  id: 'alt-require',
  description:
    'The alt attribute of an <img> element must be present and alt attribute of area[href] and input[type=image] must have a value.',
  msgs: msgs,
  init: function(parser, reporter) {
    var self = this;
    parser.addListener('tagstart', function(event) {
      var tagName = event.tagName.toLowerCase(),
        mapAttrs = parser.getMapAttrs(event.attrs),
        col = event.col + tagName.length + 1,
        selector;
      if (tagName === 'img' && !('alt' in mapAttrs)) {
        reporter.warn(
          msgs.warn1,
          event.line,
          col,
          self,
          event.raw
        );
      } else if (
        (tagName === 'area' && 'href' in mapAttrs) ||
        (tagName === 'input' && mapAttrs['type'] === 'image')
      ) {
        if (!('alt' in mapAttrs) || mapAttrs['alt'] === '') {
          selector = tagName === 'area' ? 'area[href]' : 'input[type=image]';
          reporter.warn(
            msgs.warn2({selector: selector}),
            event.line,
            col,
            self,
            event.raw
          );
        }
      }
    });
  }
};
