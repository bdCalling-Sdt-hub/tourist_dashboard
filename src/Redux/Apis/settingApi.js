import { baseApi } from "../BaseUrl";

const settingApi = baseApi.injectEndpoints({
    // add Privacy  terms privacy
    endpoints: (build) => ({
        addAboutUs: build.mutation({
            query: (data) => ({
                url: 'rules/add-about-us',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['about']
        }),
        getAboutUs: build.query({
            query: () => ({
                url: `rules/get-about-us`,
                method: 'GET'
            }),
            providesTags: ['about']
        }),
        addPrivacy: build.mutation({
            query: (data) => ({
                url: 'rules/add-facts',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['privacy']
        }),
        getPrivacy: build.query({
            query: () => ({
                url: `rules/get-facts`,
                method: 'GET'
            }),
            providesTags: ['privacy']
        }),
        addTerms: build.mutation({
            query: (data) => ({
                url: '/rules/add-rules',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['terms']
        }),
        getTerms: build.query({
            query: () => ({
                url: `rules/get-rules`,
                method: 'GET'
            }),
            providesTags: ['terms']
        }),
        getOverView: build.query({
            query: () => ({
                url: `dashboard/overview`,
                method: 'GET'
            }),
            providesTags: ['overview']
        }),
    })
})
export const {
    useAddAboutUsMutation,
    useGetAboutUsQuery,
    useAddPrivacyMutation,
    useGetPrivacyQuery,
    useGetTermsQuery,
    useAddTermsMutation,
    useGetOverViewQuery
} = settingApi