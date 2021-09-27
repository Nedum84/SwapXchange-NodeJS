interface Paginate {
  limit: number;
  offset: number;
}

class Helpers {
  /**
   * stripes limit & offset from express req.query
   * @param query express Req Query
   * @returns Paginate instance
   */
  static getPaginate(query: any): Paginate {
    const { limit = 10, offset = 0 } = query;
    return {
      limit,
      offset,
    };
  }
}

export default Helpers;
