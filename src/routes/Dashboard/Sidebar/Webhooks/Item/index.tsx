import React from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import useForwardingIds from 'hooks/useForwardingIds';

import './style.css';

const formatCount = (n: number) =>
  n === 0 ? '' : n > 9 ? '9+' : n.toString();

const Item = ({
  id,
  label,
  isActive,
  isUnread,
  forwardSuccessCount,
  forwardErrorCount,
}: {
  id: string;
  label: string;
  isActive: boolean;
  isUnread: boolean;
  forwardSuccessCount: number;
  forwardErrorCount: number;
}) => {
  const { endpointId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const { forwardingIds } = useForwardingIds();

  return (
    <div
      className={`webhooks__item ${
        isActive ? 'webhooks__item--active' : ''
      } ${isUnread ? 'webhooks__item--unread' : ''}`}
      onClick={() =>
        location.pathname.includes('/forwards')
          ? history.push(
              `/endpoints/${endpointId}/webhooks/${id}/forwards`,
            )
          : history.push(`/endpoints/${endpointId}/webhooks/${id}`)
      }
    >
      <div className="webhooks__item__label">{label}</div>
      <div className="webhooks__item__badges">
        {forwardingIds.includes(id) ? (
          <ForwardingBadges />
        ) : (
          <IdleBadges
            forwardSuccessCount={forwardSuccessCount}
            forwardErrorCount={forwardErrorCount}
          />
        )}
      </div>
    </div>
  );
};

const ForwardingBadges = () => {
  return <i className="fa fa-circle-o-notch fa-spin"></i>;
};

const IdleBadges = ({
  forwardSuccessCount,
  forwardErrorCount,
}: {
  forwardSuccessCount: number;
  forwardErrorCount: number;
}) => {
  return (
    <>
      {forwardSuccessCount > 0 && (
        <span className="badge badge-success">
          {formatCount(forwardSuccessCount)}
        </span>
      )}{' '}
      {forwardErrorCount > 0 && (
        <span className="badge badge-danger">
          {formatCount(forwardErrorCount)}
        </span>
      )}{' '}
      <i className="fa fa-times-circle"></i>
    </>
  );
};

export default Item;
