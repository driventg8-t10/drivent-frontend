import { useEffect } from 'react';
import CertificatePage from './CertificatePage';
import { useState } from 'react';
import { getCertificateInfo } from '../../../services/certificateApi';
import useToken from '../../../hooks/useToken';
import { getEventInfo } from '../../../services/eventApi';
import dayjs from 'dayjs';
import UnfinishedEvent from './UnfinishedEvent';

export default function Certificate() {
  const [certificateInfo, setCertificateInfo] = useState();
  const [eventInfo, setEventInfo] = useState();
  const token = useToken();

  function isAtLeastDayBefore(endsAt) {
    const endsAtDate = dayjs(endsAt, 'YYYY-MM-DD HH:mm:ss');
    const today = dayjs().startOf('day');
    return endsAtDate.isBefore(today);
  }

  useEffect(() => {
    getEventInfo()
      .then((event) => {
        const result = isAtLeastDayBefore(event.endsAt);
        if (result) {
          setEventInfo(event);
        } else {
          setEventInfo('unfinishedEvent');
        }
      })
      .catch((err) => {
        setEventInfo('error');
      });
  }, []);

  if (eventInfo === 'error') {
    return 'Oops... algo deu errado';
  }

  if (eventInfo === 'unfinishedEvent') {
    return <UnfinishedEvent />;
  }

  if (!eventInfo) {
    return 'Carregando...';
  }

  return <CertificatePage />;
}
