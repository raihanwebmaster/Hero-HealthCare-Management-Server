import { Admin, Prisma, UserStatus,} from "@prisma/client"
import { adminSearchAbleFields } from "./admin.constant"
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { IAdminFilterRequest } from "./admin.interface";
import { IPaginationOptions } from "../../interfaces/pagination";

const getAllAdminFromDB = async(params: IAdminFilterRequest, options: IPaginationOptions) => {
    const {limit, skip, page, sortBy, sortOrder } = paginationHelper.calcultatePagination(options);
    const {searchTerm, ...filterData} = params
    const andConditons: Prisma.AdminWhereInput[] = []
    if(searchTerm) {
        andConditons.push({
            OR: adminSearchAbleFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive"
                }
            }))
        })
    }
    if(Object.keys(filterData).length > 0){
       andConditons.push({
        AND: Object.keys(filterData).map(key => ({
            [key] : {
                equals: (filterData as any)[key]
            }
        }))
       }) 
    }
    andConditons.push({
        isDeleted: false,
    })
    const whereConditions: Prisma.AdminWhereInput =  {AND: andConditons}
    const result = await prisma.admin.findMany({
        where: whereConditions,
        skip,
        take : limit,
        orderBy: {
            [sortBy]: sortOrder
        }
    })
    const total = await prisma.admin.count({
        where: whereConditions
    })
    return {
        meta : {
            page,
            limit,
            total,
        },
        data : result,
    }
}


const getByIdFromDB = async(id: string): Promise<Admin | null> => {
    const result = await prisma.admin.findUnique({
        where: {
            id,
            isDeleted: false,
        }
    })

    return result;

}

const updateIntoDB = async(id: string, data: Partial<Admin> ): Promise<Admin | null> => {
    await prisma.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false,
        }
    })
    const result = await prisma.admin.update({
        where: {
            id
        },
        data
    })

    return result

}

const deleteFromDB = async(id: string) : Promise<Admin | null> => {
    await prisma.admin.findFirstOrThrow({
        where: {
            id
        }
    })
    const result = await prisma.$transaction(async(transactionClient) => {
        const adminDeletedData = await transactionClient.admin.delete({
            where: {
                id,
            }
        })

        await transactionClient.user.delete({
            where: {
                email: adminDeletedData.email
            }
        })
        return adminDeletedData;
    })
    return result;
}

const softDeleteFromDB = async(id: string)  : Promise<Admin | null>  => {
    await prisma.admin.findFirstOrThrow({
        where: {
            id,
            isDeleted: false,
        }
    })
    const result = await prisma.$transaction(async(transactionClient) => {
        const adminDeletedData = await transactionClient.admin.update({
            where: {
                id
            }, 
            data : {
                isDeleted: true,
            }
        })

        await transactionClient.user.update({
            where: {
                email: adminDeletedData.email
            },
            data : {
                status: UserStatus.DELETED
            }
        })
        return adminDeletedData;
    })
    return result;
}
export const adminService = {
    getAllAdminFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
    softDeleteFromDB
}