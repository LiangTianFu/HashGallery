//3.通用函数
function get(selector) {
  var method = selector.substr(0, 1) == '.' ? 'getElementsByClassName' : 'getElementById';
  return document[method](selector.substr(1));
}

//随机生成一个值 支持取值范围 random([min,max])
function random(range) {
  var max = Math.max(range[0], range[1]);
  var min = Math.min(range[0], range[1]);

  var diff = max - min; //差值[1,6]=>5(0~5)(x>0,x<5)
  var number = Math.floor(Math.random() * diff + min);
  return number;
}

//4.输出所有的海报
var data = data;

function addPhotos() {
  var template = get('#wrap').innerHTML;
  var html = [];
  var nav = [];

  //7.输出控制按钮，每个按钮对应一个海报
  for (var i in data) {
    //替换关键字
    var _html = template
      .replace('{{index}}', i)
      .replace('{{img}}', data[i].img)
      .replace('{{caption}}', data[i].caption)
      .replace('{{desc}}', data[i].desc);
    html.push(_html);
    // nav.push('<span id="nav_' + i + '" class="i"  onclick="turn(get(\'#photo_' + i + '\'))" ></span>');
    nav.push('<span id="nav_' + i + '" class="i"  onclick = "turn(get(\'#photo_' + i + '\'))"></span>')

  }
  html.push('<div class="nav">' + nav.join('') + '</div>');

  get('#wrap').innerHTML = html.join('');

  rsort(random([0, data.length])); //随机选取一张海报居中
}
addPhotos();

//6.计算左右分区的范围
function range() {
  var range = {
    left: {
      x: [],
      y: []
    },
    right: {
      x: [],
      y: []
    }
  };
  var wrap = {
    w: get("#wrap").clientWidth,
    h: get("#wrap").clientHeight
  };

  var photo = {
    w: get(".photo")[0].clientWidth,
    h: get(".photo")[0].clientHeight
  };

  range.wrap = wrap;
  range.photo = photo;

  range.left.x = [0 - photo.w, wrap.w / 2 - photo.w];
  range.left.y = [0 - photo.h, wrap.h];

  range.right.x = [wrap.w / 2 + photo.w / 2, wrap.w];
  range.right.y = range.left.y;

  return range;
}

//5.海报排序
function rsort(n) {
  var _photo = get(".photo");
  var photos = [];
  for (s = 0; s < _photo.length; s++) {
    _photo[s].className = _photo[s].className.replace(/\s*photo-center\s*/, " ");
    _photo[s].className = _photo[s].className.replace(/\s*photo-front\s*/, " ");
    _photo[s].className = _photo[s].className.replace(/\s*photo-back\s*/, " ");

    _photo[s].className += 'photo-front';
    _photo[s].style.left = "";
    _photo[s].style.top = "";


    _photo[s].style['transform'] = _photo[s].style['-webkit-transform'] = 'rotate(0deg) scale(1.3)';

    //转化为数组
    photos.push(_photo[s]);

  }


  var photo_center = get("#photo_" + n);
  photo_center.className += " photo_center ";
  //删除居中的海报
  photo_center = photos.splice(n, 1)[0];

  //除居中的海报，其他海报分左右两部分
  var photo_left = photos.splice(0, Math.ceil(photos.length / 2))
  var photo_right = photos;

  var ranges = range();
  for (var s in photo_left) {
    var photo = photo_left[s];
    //位置
    photo.style.left = random(ranges.left.x) + 'px';
    photo.style.top = random(ranges.left.y) + 'px';
    //角度
    photo.style['transform'] = photo.style['-webkit-transform'] = 'rotate(' + random([-150, 150]) + 'deg) scale(1)';


  }

  for (var s in photo_right) {
    var photo = photo_right[s];
    //位置
    photo.style.left = random(ranges.right.x) + 'px';
    photo.style.top = random(ranges.right.y) + 'px';
    //角度
    photo.style['transform'] = photo.style['-webkit-transform'] = 'rotate(' + random([-150, 150]) + 'deg) scale(1)';
  }

  //按钮对应样式,控制按钮
  var navs = get('.i');
  for (var i = 0; i < navs.length; i++) {
    navs[i].className = navs[i].className.replace(/\s*i_current\s*/, ' ');
    navs[i].className = navs[i].className.replace(/\s*i_back\s*/, ' ');
  }
  get('#nav_' + n).className += ' i_current ';
  console.log(photo_left.length, photo_right.length);
}




//1.翻转控制
function turn(elem) {
  var cls = elem.className;
  var n = elem.id.split('_')[1];

  if (!/photo_center/.test(cls)) {
    return rsort(n);
  }

  if (/photo-front/.test(cls)) {
    cls = cls.replace(/photo-front/, 'photo-back');
    get('#nav_' + n).className += 'i_back';
  } else {
    cls = cls.replace(/photo-back/, 'photo-front');
    get('#nav_' + n).className = get('#nav_' + n).className.replace(/\s*i_back\s*/, ' ');

    // } else {
    //   cls = cls.replace(/photo-back/, 'photo-front');
    //        get('#nav_' + n).className = get('#nav_' + n).className.replace(/\s*i_back\s*/, ' ');
    //
  }

  return elem.className = cls;
}
