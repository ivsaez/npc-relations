# Description
This package contains a classes library to model NPCs relations.

# Provided classes
## Relation
A relation is modelled using three simple traits (friendship, love, sex attraction) which are represented with numbers from 0 to 100, being 0 the worst value for the trait and 100 the best one.
A relation could be also a familiar relation, and it can be specified with the Familiar enumeration. Opposite familiarity can be calculated using FamiliarDomain factory.
A relation can be pure, which means that any time the normalize method is called, if any trait have increased or decreased from its initial value it will be returned 1 unit to the original value.

## RelationSet
It is a collection that allows to model a list of relations. It is useful to manage a set of relations of a given NPC. It also allows to normalize all of them at once.