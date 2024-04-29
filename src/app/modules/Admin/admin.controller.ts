import { adminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";




const getAllAdmin = catchAsync(async (req, res) => {
     const filter = pick(req.query, adminFilterableFields)
     const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
     const result = await adminService.getAllAdminFromDB(filter, options)
     sendResponse(res, {
         statusCode: httpStatus.OK,
         success: true,
         message: "Admin data feteched!",
         meta: result.meta,
         data: result.data
     })
 })

const getSingleAdmin = catchAsync(async(req, res) => {
    const {id} = req.params
        const result = adminService.getByIdFromDB(id)
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Admin data fetched by id!",
            data: result
        })
})
const updatedAdmin = catchAsync(async(req, res) => {
    const {id} = req.params
        const result = adminService.updateIntoDB(id, req.body)
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Admin data updated!",
            data: result
        })

})
const deleteAdmin = catchAsync(async(req, res) => {
    const {id} = req.params
        const result = adminService.deleteFromDB(id)
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Admin data deleted!",
            data: result
        })

})
const softDeleteAdmin = catchAsync(async(req, res,) => {
    const {id} = req.params
        const result = adminService.softDeleteFromDB(id)
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Admin data deleted!",
            data: result
        })

})


export const adminController = {
    getAllAdmin,
    getSingleAdmin,
    updatedAdmin,
    deleteAdmin,
    softDeleteAdmin
}
