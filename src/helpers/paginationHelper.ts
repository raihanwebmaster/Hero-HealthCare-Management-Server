type IOptions = {
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string
}
type IOptionsResult = {
    page: number,
    limit: number,
    skip: number,
    sortBy: string,
    sortOrder: string
}
const calcultatePagination = (options: IOptions) : IOptionsResult => {
    const page: number = Number(options.page || 1)
    const limit: number = Number(options.limit || 10)
    const skip : number = (page - 1) * 5
    const sortBy: string = options.sortBy || 'createdAt'
    const sortOrder: string = options.sortOrder || 'desc'

    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    }
}

export const paginationHelper = {
    calcultatePagination
}