class Notification {
  static personSingularOrPlural(guestGroupSize) {
    return guestGroupSize > 1 ? 'Personen' : 'Person';
  }

  static activateWindow($notification) {
    $notification.classList.add('notification--visible');

    setTimeout(() => {
      $notification.classList.remove('notification--visible');
    }, 5000);
  }

  static showNotification($notification, guest, waitidNumber, title) {
    let $notificationHeader = $notification.querySelector('.notification__header'),
      $notificationHeaderTitle = $notificationHeader.querySelector('.title'),
      $notificationMain = $notification.querySelector('.notification__main'),
      $notificationMainTitle = $notificationMain.querySelector('.title'),
      $notificationParagraph = $notification.querySelector('.notification__paragraph');

    // Implement here fallback for empty comment

    $notificationHeaderTitle.innerHTML = title;
    $notificationMainTitle.innerHTML = `<strong>#${waitidNumber}</strong>`;
    $notificationParagraph.innerHTML = `${guest.group_size} ${this.personSingularOrPlural(guest.group_size)} – ${guest.comment}`
  }

  static showNew(guest, waitidNumber) {
    let $notification = document.querySelector('.notification');
    this.showNotification($notification, guest, waitidNumber, 'Neuer Gast');
    this.activateWindow($notification);
  }

  static showUpdate(guest, waitidNumber) {
    let $notification = document.querySelector('.notification');
    this.showNotification($notification, guest, waitidNumber, 'Gast bearbeitet');
    this.activateWindow($notification);
  }
}
