import CampaignUpdate from 'super/CampaignUpdate';
import CustomerCreate from 'super/CustomerCreate';
import CustomerUpdate from 'super/CustomerUpdate';

export default [
  {
    name: 'Create',
    url: '/customer/create',
    target: CustomerCreate,
  },
  {
    name: 'Update',
    url: '/campaign/update/:id',
    target: CampaignUpdate,
  },
  {
    name: 'Update',
    url: '/customer/update/:id',
    target: CustomerUpdate,
  },
];
