// Dados mockados que simulam a resposta de uma API
const mockedApiResponse = {
  drivers: [
    {
      id: "1",
      name: "João Silva",
    },
    {
      id: "2",
      name: "Maria Gonçalves",
    },
    {
      id: "3",
      name: "Carlos Pereira",
    },
  ],
  travels: [
    {
      id: "1",
      driverId: "1",
      startDate: "2024-03-01T08:00:00",
      endDate: "2024-03-03T17:00:00",
    },
    {
      id: "2",
      driverId: "2",
      startDate: "2024-03-02T09:00:00",
      endDate: "2024-03-05T18:00:00",
    },
    {
      id: "3",
      driverId: "3",
      startDate: "2024-03-04T07:30:00",
      endDate: "2024-03-06T16:30:00",
    },
  ],
};

export function fetchReport(key = "") {
  console.log(key);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockedApiResponse);
    }, 1000); // Delay de 1 segundo
  });
}
