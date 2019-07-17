package com.library.service;

import java.util.List;

import javax.persistence.criteria.JoinType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import com.library.domain.BorrowedBook;
import com.library.domain.*; // for static metamodels
import com.library.repository.BorrowedBookRepository;
import com.library.service.dto.BorrowedBookCriteria;

/**
 * Service for executing complex queries for BorrowedBook entities in the database.
 * The main input is a {@link BorrowedBookCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link BorrowedBook} or a {@link Page} of {@link BorrowedBook} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class BorrowedBookQueryService extends QueryService<BorrowedBook> {

    private final Logger log = LoggerFactory.getLogger(BorrowedBookQueryService.class);

    private final BorrowedBookRepository borrowedBookRepository;

    public BorrowedBookQueryService(BorrowedBookRepository borrowedBookRepository) {
        this.borrowedBookRepository = borrowedBookRepository;
    }

    /**
     * Return a {@link List} of {@link BorrowedBook} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<BorrowedBook> findByCriteria(BorrowedBookCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<BorrowedBook> specification = createSpecification(criteria);
        return borrowedBookRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link BorrowedBook} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<BorrowedBook> findByCriteria(BorrowedBookCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<BorrowedBook> specification = createSpecification(criteria);
        return borrowedBookRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(BorrowedBookCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<BorrowedBook> specification = createSpecification(criteria);
        return borrowedBookRepository.count(specification);
    }

    /**
     * Function to convert BorrowedBookCriteria to a {@link Specification}
     */
    private Specification<BorrowedBook> createSpecification(BorrowedBookCriteria criteria) {
        Specification<BorrowedBook> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), BorrowedBook_.id));
            }
            if (criteria.getBorrowDate() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getBorrowDate(), BorrowedBook_.borrowDate));
            }
            if (criteria.getBookId() != null) {
                specification = specification.and(buildSpecification(criteria.getBookId(),
                    root -> root.join(BorrowedBook_.book, JoinType.LEFT).get(Book_.id)));
            }
            if (criteria.getClientId() != null) {
                specification = specification.and(buildSpecification(criteria.getClientId(),
                    root -> root.join(BorrowedBook_.client, JoinType.LEFT).get(Client_.id)));
            }
        }
        return specification;
    }
}
