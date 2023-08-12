import { useContext } from 'react';
import UserContext from '../../../contexts/UserContext';
import { ActivityContainer, GeneralContainer, HourInfo, PlaceText, TalkContainer, TalkTitle, VacancyInfo, IconEnter, IconFull, IconSubscribed } from './styled';
import { toast } from 'react-toastify';
import { getActivities, subscribeActivity } from '../../../services/activityApi';

export default function ActivitySelection( { activities, token, selectedDate, setActivities, convertToFormattedDate } ) {
  const { userData: user } = useContext(UserContext); 

  function showVacancy( capacity, subscribers) {
    const total = Number(capacity) - Number(subscribers.length);
    const userIsSubscribed = subscribers.find(e => Number(e.userId) === Number(user.user.id));
    if(userIsSubscribed) return ('Inscrito');
    if(total === 0) return('Esgotado');
    return(`${total} vagas`);
  }

  function showIcon( capacity, subscribers, id, date) {
    const total = Number(capacity) - Number(subscribers.length);
    const userIsSubscribed = subscribers.find(e => Number(e.userId) === Number(user.user.id));
    if(userIsSubscribed) return(<IconSubscribed/>);
    if(total === 0) {
      return(<IconFull/>);
    }
    return(<IconEnter onClick={() => {subscribeToActivity(id, date);}}/>);
  }

  function timeDifference(start, end) {
    const startTime= new Date(start);
    const endTime= new Date(end);

    const timeDifferenceInMinutes = (endTime - startTime) / (1000 * 60);
    
    return((timeDifferenceInMinutes/60)*80);
  }
  
  function subscribeToActivity(id, date) {
    console.log(user.user.id);

    const promise = subscribeActivity( { activityId: id }, token );
    promise
      .then((res) => {
        const dateToSend = String(convertToFormattedDate(date[0]));
        const innerPromise = getActivities(token, dateToSend);
        innerPromise
          .then((res) => {
            setActivities(res);
          })
          .catch((err) => {
            toast('Não foi possível buscar as atividades.');
          });
        toast('Inscrito com sucesso!');
      })
      .catch((err) => {
        toast('Não foi possível se inscrever na atividade.');
      });
  }

  return (
    <GeneralContainer>
      {activities.map((place, k) => (
        <ActivityContainer key={k}>  
          <PlaceText> {place.name} </PlaceText>
          <div>
            {place.Activity.map((activity, l) => (
              <TalkContainer 
                key={l} 
                vacancy={showVacancy(activity.capacity, activity.ActivityEnrollment)}
                size = {timeDifference(activity.startDate, activity.endDate)} 
              >
                  
                <div>
                  <TalkTitle>{activity.name}</TalkTitle>
                  <HourInfo>{activity.startDate.slice(11, 16)} - {activity.endDate.slice(11, 16)}</HourInfo>
                </div>

                <div>
                  {showIcon(activity.capacity, activity.ActivityEnrollment, activity.id, selectedDate)}
                  <VacancyInfo> {showVacancy(activity.capacity, activity.ActivityEnrollment)} </VacancyInfo>
                </div>
              </TalkContainer>
            ))}
          </div>
        </ActivityContainer>
      ))}
    </GeneralContainer>
  );
}
