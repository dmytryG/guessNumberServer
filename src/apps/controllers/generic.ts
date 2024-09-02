export class Filters {
  conditions: any = {
    lt: 'lt',
    le: 'lte',
    ge: 'gte',
    gt: 'gt',
    nt: (v: any) => {
      return {
        not: v,
      }
    },
    con: (v: any) => {
      return {
        contains: v,
      }
    },
  }

  prepare(query: any, queries: any): any {
    for (const key in queries) {
      const v = queries[key]
      const [field, op] = key.split('_')

      if (op === undefined) {
        query = {
          contains: v,
        }
      }

      const condition = this.conditions[op]

      query.where[field] =
        typeof condition === 'function' ? condition(v) : { [condition]: v }
    }

    return query
  }
}

const applySort = (params: any, values: any, query: any): any => {
  for (const i in params) {
    if (!params[i].startsWith('sort_')) continue
    const field = params[i].slice(5)
    query.orderBy[field] = values[i]
  }

  return query
}

export const mkindex = (filter: Filters | null = null, sort: string[]): any => {
  // if (sort === true) {
  //   if (filter !== null) {
  //     sort = Object.keys(filter.conf)
  //   } else {
  //     throw new Error(
  //       'sort columns should be explicitly set when no filter is set'
  //     )
  //   }
  // }

  let query = {
    where: {},
    orderBy: {},
  }

  if (filter !== null) {
    const args = {}
    query = filter.prepare(args, query)
  }

  if (sort.length > 0) {
    query = applySort([], [], query)
  }

  return query
}
