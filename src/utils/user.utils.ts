class UserUtils {
  static radiusGeometry = (product_lat: number, product_long: number) => {
    return `(
        (((acos(sin((${product_lat}*pi()/180)) * 
        sin(("User".address_lat*pi()/180))+cos((${product_lat}*pi()/180))
        *  cos(("User".address_lat*pi()/180)) * 
        cos(((${product_long}- "User".address_long)*pi()/180))))*180/pi())*60*1.1515)
    )`;
  };
}

export default UserUtils;
