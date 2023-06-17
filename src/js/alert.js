import alerts from '../alerts.json';

const Alert = {
  showAlerts: function () {
    if (alerts) {
      const alertSection = document.createElement('section');
      alertSection.setAttribute('class', 'alert-list');
      alerts.map((alert) => {
        const alertElement = document.createElement('p');
        alertElement.textContent = alert.message;
        alertElement.style.color = alert.color;
        alertElement.style.backgroundColor = alert.background;
        alertSection.appendChild(alertElement);
      });
      document.querySelector('main').prepend(alertSection);
    }
  },
};

export default Alert;
