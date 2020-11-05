import { objectType } from '@nexus/schema'

const Image = objectType({
    name: 'Image',
    definition(t) {
        t.string('src')
        t.string('alt')
    },
})

export { Image }
