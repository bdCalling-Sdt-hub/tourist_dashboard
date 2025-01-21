import { baseApi } from "../BaseUrl";

const vendorApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllVendor: builder.query({
            query: () => ({
                url: `vendor/get-all-vendor-request`,
                method: 'GET'
            }),
            providesTags: ['vendor']
        }),
        getVendors: builder.query({
            query: ({ page, searchTerm, status, limit }) => {
                const param = { page, searchTerm, limit }
                if (status) {
                    param.status = status
                }
                return {
                    url: `vendor/get-all-vendor`,
                    method: 'GET',
                    params: param
                }
            },
            providesTags: ['vendor']
        }),
        acceptVendor: builder.mutation({
            query: (id) => ({
                url: `vendor/accept-request/${id}`,
                method: 'PATCH',
                body: {}
            }),
            invalidatesTags: ['vendor']
        }),
        declineRequest: builder.mutation({
            query: ({ id, reasons, status }) => ({
                url: `/vendor/status?id=${id}&status=${status}`,
                method: 'PATCH',
                body: { reasons }
            }),
            invalidatesTags: ['vendor']
        }),
    })
})
export const {
    useGetAllVendorQuery,
    useGetVendorsQuery,
    useAcceptVendorMutation,
    useDeclineRequestMutation
} = vendorApis