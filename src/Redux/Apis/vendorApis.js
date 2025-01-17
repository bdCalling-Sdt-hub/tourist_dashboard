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
            query: ({ page, searchTerm, limit }) => ({
                url: `vendor/get-all-vendor`,
                method: 'GET',
                params: { page, searchTerm, limit }
            }),
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