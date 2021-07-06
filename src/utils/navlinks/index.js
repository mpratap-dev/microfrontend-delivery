import deliveryLinks from './delivery';

const navLink = [
  ...deliveryLinks
];

export default navLink;

export const getSortedNavlinks = (arr) => {
  return arr.sort((current, next) => current.label > next.label ? 1 : -1)
}
