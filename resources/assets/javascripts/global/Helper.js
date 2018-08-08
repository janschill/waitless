class Helper {
  static addClassnames($element, classnames) {
    classnames.forEach(classname => {
      $element.classList.add(classname);
    });
  }
}
