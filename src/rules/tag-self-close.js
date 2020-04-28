var msgs = {
  warn1: function(values) {
    return 'The empty tag : [ ' + values.tagName + ' ] must be self closed.';
  }
};

export default {
  id: 'tag-self-close',
  description: 'Empty tags must be self closed.',
  msgs: msgs,
  init: function(parser, reporter) {
    var self = this;
    var mapEmptyTags = parser.makeMap(
      'area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr'
    ); //HTML 4.01 + HTML 5
    parser.addListener('tagstart', function(event) {
      var tagName = event.tagName.toLowerCase();
      if (mapEmptyTags[tagName] !== undefined) {
        if (!event.close) {
          reporter.warn(
            msgs.warn1({tagName: tagName}),
            event.line,
            event.col,
            self,
            event.raw
          );
        }
      }
    });
  }
};
