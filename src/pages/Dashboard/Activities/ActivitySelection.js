import { ActivityContainer, GeneralContainer, HourInfo, PlaceText, TalkContainer, TalkTitle, VacancyInfo, IconEnter, IconFull, IconSubscribed } from './styled';

export default function ActivitySelection() {
  const isFull = false;
  const subscribed = true;

  function showVacancy() {
    if(subscribed === true) return('Inscrito');
    else if(isFull) return('Esgotado');
    return('27 vagas');
  }

  function showIcon() {
    if(subscribed === true) return(<IconSubscribed/>);
    else if(isFull) return(<IconFull/>);
    return(<IconEnter/>);
  }

  return (
    <GeneralContainer>

      <ActivityContainer>  
        <PlaceText>Auditorio Principal</PlaceText>

        <div>
          <TalkContainer subscribed={subscribed} isFull={false} size={(120/60)*80}>
            <div>
              <TalkTitle>Minecraft: montando o PC ideal</TalkTitle>
              <HourInfo>09:00 - 10:00</HourInfo>
            </div>

            <div>
              {showIcon()}
              <VacancyInfo> {showVacancy()} </VacancyInfo>
            </div>
          </TalkContainer>

          <TalkContainer isFull={true}>
            <div>
              <TalkTitle>LoL: montando o PC ideal</TalkTitle>
              <HourInfo>10:00 - 11:00</HourInfo>
            </div>

            <div>
              <IconFull/>
              <VacancyInfo> 27 Vagas</VacancyInfo>
            </div>
          </TalkContainer>
        </div>
      </ActivityContainer>

      <ActivityContainer>  
        <PlaceText>Auditório Lateral</PlaceText>
        <div>
          <TalkContainer isFull={false}>
            <div>
              <TalkTitle>Palestra x</TalkTitle>
              <HourInfo>09:00 - 11:00</HourInfo>
            </div>

            <div>
              <IconEnter/>
              <VacancyInfo> 27 Vagas</VacancyInfo>
            </div>
          </TalkContainer>
        </div>
      </ActivityContainer>

      <ActivityContainer>  
        <PlaceText>Sala de Workshop</PlaceText>
        <div>
          <TalkContainer isFull={false}>
            <div>
              <TalkTitle>Palestra y</TalkTitle>
              <HourInfo>09:00 - 10:00</HourInfo>
            </div>

            <div>
              <IconEnter/>
              <VacancyInfo> 27 Vagas</VacancyInfo>
            </div>
          </TalkContainer>

          <TalkContainer isFull={false}>
            <div>
              <TalkTitle>Palestra z</TalkTitle>
              <HourInfo>10:00 - 11:00</HourInfo>
            </div>

            <div>
              <IconSubscribed/>
              <VacancyInfo> 27 Vagas</VacancyInfo>
            </div>
          </TalkContainer>
        </div>
      </ActivityContainer>
    </GeneralContainer>
  );
}
