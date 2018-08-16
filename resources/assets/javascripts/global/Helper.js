class Helper {
  static addClassnames($element, classnames) {
    classnames.forEach(classname => {
      $element.classList.add(classname);
    });
  }

  static stringPadding(number) {
    return String('00' + number).slice(-2);
  }
}
