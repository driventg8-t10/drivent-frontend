export default function formatTicketType(ticketTypeArr) {
  const obj = {
    online: ticketTypeArr.find((ticketType) => ticketType.isRemote),
    presencial: ticketTypeArr.find((ticketType) => !ticketType.isRemote && !ticketType.includesHotel),
    presencialSemHotel: '0',
    presencialComHotel: ticketTypeArr.find((ticketType) => !ticketType.isRemote && ticketType.includesHotel),
  };
  if (obj.online) {
    obj.online = `${obj.online.price}`;
  } else {
    obj.online = false;
  }

  if (obj.presencial) {
    obj.presencial = `${obj.presencial.price}`;
  } else {
    obj.presencial = false;
  }

  if (obj.presencialComHotel) {
    obj.presencialComHotel = `${obj.presencialComHotel.price - obj.presencial}`;
  } else {
    obj.presencial = false;
  }

  return obj;
}
