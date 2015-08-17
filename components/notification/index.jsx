import Notification from 'rc-notification';
import assign from 'object-assign';
import React from 'react';

let top = 24;
let notificationInstance;

function callback(key, btnCose) {
  if (btnCose) {
    btnCose(key);
  }
}

function getNotificationInstance() {
  notificationInstance = notificationInstance || Notification.newInstance({
    prefixCls: 'ant-notification',
    style: {
      top: top,
      right: 0
    }
  });
  return notificationInstance;
}

function notice(args) {
  let duration;
  if (args.duration === undefined) {
    duration = 500;
  } else {
    duration = args.duration;
  }

  if (args.icon) {
    let prefixCls = ' ant-notification-notice-content-icon-';
    let iconClass = 'anticon anticon-';
    switch (args.icon) {
      case 'success':
        iconClass += 'check-circle-o';
        break;
      case 'info':
        iconClass += 'info-circle-o';
        break;
      case 'error':
        iconClass += 'exclamation-circle-o';
        break;
      case 'warn':
        iconClass += 'question-circle-o';
        break;
      default:
        iconClass += 'info-circle';
    }

    getNotificationInstance().notice({
      content: <div>
        <i className={iconClass + prefixCls + 'icon-' + args.icon + prefixCls + 'icon'}></i>

        <p className={prefixCls + 'message'}>{args.message}</p>

        <p className={prefixCls + 'description'}>{args.description}</p>
      </div>,
      duration: duration,
      closable: true,
      onClose: args.onClose,
      style: {}
    });
  } else {
    let prefixCls = 'ant-notification-notice-content-';
    if (!args.btn) {
      getNotificationInstance().notice({
        content: <div>
          <p className={prefixCls + 'message'}>{args.message}</p>

          <p className={prefixCls + 'description'}>{args.description}</p>
        </div>,
        duration: duration,
        closable: true,
        onClose: args.onClose,
        style: {}
      });
    } else {
      let key = 'manual' + new Date().getTime();
      getNotificationInstance().notice({
        content: <div>
          <p className={prefixCls + 'message'}>{args.message}</p>

          <p className={prefixCls + 'description'}>{args.description}</p>
          <span onClick={callback.bind(null, key, args.btnClose)} className={prefixCls + 'btn'}>
            {args.btn}
          </span>
        </div>,
        duration: duration,
        closable: true,
        onClose: args.onClose,
        key: key,
        style: {}
      });
    }
  }
}

var api = {
  open(args){
    notice(args);
  },
  close(key){
    if (notificationInstance) {
      notificationInstance.removeNotice(key);
    }
  },
  config(options) {
    top = isNaN(options.top) ? 24 : options.top;
  }
};

['success', 'info', 'warn', 'error'].forEach((type) => {
  api[type] = (args) => {
    var newArgs = assign({}, args, {
      icon: type
    });
    return api.open(newArgs);
  };
});

export default api;