import { FaHome, FaUser, FaMapMarkerAlt, FaCog } from 'react-icons/fa';

export const owners = [
  {
    id: 'rec1JZlfCIBOPdcT2',
    name: 'larry miller',
    price: '695',
    amount: 7,
    jobs: [
      {
        address: '1',
        date: '2025-01-01',
        dateObject: new Date('01/02/2025'),
        id: '34342134312',
        owner: 'larry miller',
        price: '1',
        storeNumber: '1',
      },
    ],
  },
  {
    id: 'recB6qcHPxb62YJ75',
    name: 'david guitierrez',
    price: '695',
    amount: 13,
    jobs: [],
  },
  {
    id: 'recdRxBsE14Rr2VuJ',
    name: 'fred delbarrio',
    price: '795',
    amount: 12,
    jobs: [],
  },
  {
    id: 'recwTo160XST3PIoW',
    name: 'mike marasco',
    price: '795 ',
    amount: 13,
    jobs: [],
  },
];

export const links = [
  {
    id: 1,
    text: 'home',
    icon: <FaHome />,
  },
  {
    id: 2,
    text: 'user info',
    icon: <FaUser />,
  },
  {
    id: 3,
    text: 'locations',
    icon: <FaMapMarkerAlt />,
  },
  {
    id: 4,
    text: 'settings',
    icon: <FaCog />,
  },
];
